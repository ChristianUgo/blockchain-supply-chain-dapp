// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0; // Matches your project document version [cite: 18]

contract SupplyChain     { 
    enum ShipmentStatus { PENDING, IN_TRANSIT, DELIVERED } // [cite: 19]

    struct Shipment { 
        address sender; // [cite: 19]
        address receiver; // [cite: 20]
        uint256 pickupTime; // [cite: 20]
        uint256 deliveryTime; // [cite: 20]
        uint256 distance; // [cite: 20]
        uint256 price; // [cite: 20]
        ShipmentStatus status; // [cite: 20]
        bool isPaid; // [cite: 21]
    } 

    mapping(address => Shipment[]) public shipments; // [cite: 21]
    uint256 public shipmentCount; // [cite: 22]

    struct TyepShipment { 
        address sender; // [cite: 23]
        address receiver; // [cite: 24]
        uint256 pickupTime; // [cite: 24]
        uint256 deliveryTime; // [cite: 24]
        uint256 distance; // [cite: 24]
        uint256 price; // [cite: 24]
        ShipmentStatus status; // [cite: 24]
        bool isPaid; // [cite: 24]
    } 
    TyepShipment[] tyepShipments; // [cite: 24]

    event ShipmentCreated(address indexed sender, address indexed receiver, uint256 pickupTime, uint256 distance, uint256 price); // [cite: 25]
    event ShipmentInTransit(address indexed sender, address indexed receiver, uint256 pickupTime); // [cite: 26]
    event ShipmentDelivered(address indexed sender, address indexed receiver, uint256 deliveryTime); // [cite: 26]
    event ShipmentPaid(address indexed sender, address indexed receiver, uint256 amount); // [cite: 27]

    constructor() { 
        shipmentCount = 0; // [cite: 27]
    } 

    function createShipment(address _receiver, uint256 _pickupTime, uint256 _distance, uint256 _price) public payable { 
        require(msg.value == _price, "Payment amount must match the price."); // [cite: 28]

        Shipment memory shipment = Shipment(msg.sender, _receiver, _pickupTime, 0, _distance, _price, ShipmentStatus.PENDING, false); // [cite: 29]
        shipments[msg.sender].push(shipment); // [cite: 30]
        shipmentCount++; // [cite: 31]

        tyepShipments.push( 
            TyepShipment( 
                msg.sender, // [cite: 32]
                _receiver, // [cite: 32]
                _pickupTime, // [cite: 32]
                0, // [cite: 32]
                _distance, // [cite: 32]
                _price, // [cite: 32]
                ShipmentStatus.PENDING, // [cite: 32]
                false // [cite: 32]
            ) 
        ); 

        emit ShipmentCreated(msg.sender, _receiver, _pickupTime, _distance, _price); // [cite: 33]
    } 

    function startShipment(address _sender, address _receiver, uint256 _index) public { 
        Shipment storage shipment = shipments[_sender][_index]; // [cite: 34]
        TyepShipment storage tyepShipment = tyepShipments[_index]; // [cite: 35]

        require(shipment.receiver == _receiver, "Invalid receiver."); // [cite: 36]
        require(shipment.status == ShipmentStatus.PENDING, "Shipment already in transit."); // [cite: 36]

        shipment.status = ShipmentStatus.IN_TRANSIT; // [cite: 36]
        tyepShipment.status = ShipmentStatus.IN_TRANSIT; // [cite: 37]

        emit ShipmentInTransit(_sender, _receiver, shipment.pickupTime); // [cite: 38]
    } 

    function completeShipment(address _sender, address _receiver, uint256 _index) public { 
        Shipment storage shipment = shipments[_sender][_index]; // [cite: 39]
        TyepShipment storage tyepShipment = tyepShipments[_index]; // [cite: 40]

        require(shipment.receiver == _receiver, "Invalid receiver."); // [cite: 41]
        require(shipment.status == ShipmentStatus.IN_TRANSIT, "Shipment not in transit."); 
        require(!shipment.isPaid, "Shipment already paid."); 

        shipment.status = ShipmentStatus.DELIVERED; 
        tyepShipment.status = ShipmentStatus.DELIVERED; 
        tyepShipment.deliveryTime = block.timestamp; 
        shipment.deliveryTime = block.timestamp; 

        uint256 amount = shipment.price; // 

        // --- MODERN UPDATED CALL FUNCTION TRANSFER LINK ---
        (bool success, ) = payable(shipment.sender).call{value: amount}("");
        require(success, "Delivery payment transfer failed.");
        // ---------------------------------------------------

        shipment.isPaid = true; // 
        tyepShipment.isPaid = true; // 

        emit ShipmentDelivered(_sender, _receiver, shipment.deliveryTime); // [cite: 46]
        emit ShipmentPaid(_sender, _receiver, amount); // [cite: 46]
    } 

    function getShipment(address _sender, uint256 _index) public view returns (address, address, uint256, uint256, uint256, uint256, ShipmentStatus, bool) { 
        Shipment memory shipment = shipments[_sender][_index]; // [cite: 46]
        return (shipment.sender, shipment.receiver, shipment.pickupTime, shipment.deliveryTime, shipment.distance, shipment.price, shipment.status, shipment.isPaid); // [cite: 47]
    } 

    function getShipmentsCount(address _sender) public view returns (uint256) { 
        return shipments[_sender].length; // [cite: 47]
    } 

    function getAllTransactions() public view returns (TyepShipment[] memory) { 
        return tyepShipments; // [cite: 48]
    } 
}