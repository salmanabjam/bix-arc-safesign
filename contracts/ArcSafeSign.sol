// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

/// @title BiX Arc SafeSign
/// @notice Hybrid wallet + post-quantum approval proof for Arc Mainnet.
/// @dev No custody. No token movement. The transaction sender supplies the classical wallet signature,
///      while Arc's native SLH-DSA precompile validates the second, post-quantum approval.
contract ArcSafeSign {
    address internal constant PQ = 0x1800000000000000000000000000000000000004;

    mapping(address => bytes32) public pqKeyHash;
    mapping(address => uint256) public nonce;

    event PQKeyRegistered(address indexed account, bytes32 indexed keyHash);
    event SafeApproval(address indexed account, bytes32 indexed actionHash, uint256 nonce);

    function registerPQKey(bytes calldata verifyingKey) external {
        require(verifyingKey.length == 32, "bad pq key");
        bytes32 h = keccak256(verifyingKey);
        pqKeyHash[msg.sender] = h;
        emit PQKeyRegistered(msg.sender, h);
    }

    function messageFor(address account, bytes32 actionHash) public view returns (bytes memory) {
        return abi.encodePacked(
            "BiX Arc SafeSign v1",
            block.chainid,
            address(this),
            account,
            nonce[account],
            actionHash
        );
    }

    function approve(
        bytes32 actionHash,
        bytes calldata verifyingKey,
        bytes calldata pqSignature
    ) external returns (bool) {
        bytes32 saved = pqKeyHash[msg.sender];
        require(saved != bytes32(0), "pq key not registered");
        require(keccak256(verifyingKey) == saved, "wrong pq key");

        bytes memory m = messageFor(msg.sender, actionHash);
        (bool success, bytes memory out) = PQ.staticcall(
            abi.encodeWithSignature(
                "verifySlhDsaSha2128s(bytes,bytes,bytes)",
                verifyingKey,
                m,
                pqSignature
            )
        );
        require(success && out.length >= 32 && abi.decode(out,(bool)), "invalid pq signature");

        uint256 n = nonce[msg.sender];
        nonce[msg.sender] = n + 1;
        emit SafeApproval(msg.sender, actionHash, n);
        return true;
    }
}
