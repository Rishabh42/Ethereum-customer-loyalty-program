# Loyalty Program

## Business Problem
Consumer loyalty programs represent strategic investments and are applicable to all
types of organizations. Currently, their disparate nature does not allow consumers (or
have limited capability) to consume them effectively across different
organizations/establishments. This tends to become cumbersome, complex and is
vulnerable to manipulations.
Solution
A Blockchain based platform that cuts through the loyalty points earned by an individual
proliferated across domains like travel, retail, financial services, and other economic
sectors. The corresponding points can be consumed by individual in any of the sphere
of his choice irrespective of the country/region/sector. The loyalty points
earned/consumed by an individual cannot be altered by individual/sector. The loyalty
points Blockchain does not persist any individual information. The solution is secure to
ensure the data integrity, stable &amp; scalable to rapidly add and maintain loyalty
partnerships without adding complexity. The platform caters to near real time
processing. The aim is to eliminate any intermediary from the system.
Use Case <br />
1. Various companies offering loyalty cards will act as nodes in the private network. <br />
2. Admin will enable permissions to various organizations on the network. <br />
3. Admin will list down all cards with their loyalty points measures against a
standard unit. This will act as the master table for exchange of points. <br />
4. A user having loyalty points earned on a particular card can log in and exchange <br />
these points against another card. An option to select current card, chose points
to be exchanged and corresponding new card selection from drop down should
be provided to user. Preview option will depict new balance in both the cards and
if user clicks on ‘confirm’, changes will take place immediately. <br />
5. New card and existing value should reflect in respective local DBs of card
companies so that earned/exchanged points can be honored. <br />

## P2P Network
No of Nodes: 6
Node # 1: Reliance Digital <br />
Node # 2: Star Alliance <br />
Node # 3: Shoppers Stop <br />
Node # 4: Mr. Tim <br />
Node # 5: Mr. John <br />
Node # 6: Admin <br />
Users: Admin, Companies, Users <br />
Admin:
Responsible for maintaining master tables to exchange loyalty points [Need View UI]
Add-delete companies [Need UI]
Add-delete users [Need UI]
Companies:
Maintenance of loyalty points [Need View UI]
Users:
Exchange loyalty points [Maximum 50% of earned loyalty points can be exchanged]

## Smart Contract
Transfer of relevant $ amount between transacting companies. If balance is less than
the required transfer amount, exception will be thrown and user will be requested to
contact the parent company.
If transfer is successful then exchange of loyalty points based on the master table
defined in the blockchain shall take place.
In case there is any issue in transferring loyalty points, money exchanged shall be
returned back to parent company.
