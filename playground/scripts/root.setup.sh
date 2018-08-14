sudo apt-get install software-properties-common 
sudo add-apt-repository -y ppa:ethereum/ethereum 
sudo apt-get update 
sudo apt-get install ethereum 

geth --datadir eth-data/ account new 
pp 12345
# get account address to genesis file to init money
geth --datadir eth-data init genesis.json 

geth --datadir eth-data --networkid 15  --bootnodes $BOOTNODE_URL console 2>console.log

geth --rpc --rpcaddr "0.0.0.0" --rpcport "8545" --rpccorsdomain "*" --rpcapi "web3,eth" --datadir eth-data --networkid 15   console 2>console.log

geth --datadir eth-data --networkid 15  --port 30303 --nodiscover console 2>console.log
bootnode --genkey=boot.key  \
bootnode --nodekey=boot.key \


geth --datadir eth-data --networkid 1234 --rpc --rpcport 8545 --rpcapi "db, net, web3, personal" --rpccorsdomain "" --rpcaddr "0.0.0.0" console

geth --rpc --rpccorsdomain "https://remix.ethereum.org"  --datadir eth-data  --networkid 12345 
##or
geth/static-nodes.json
<datadir>/geth/static-nodes.json:
[
  "enode://f4642fa65af50cfdea8fa7414a5def7bb7991478b768e296f5e4a54e8b995de102e0ceae2e826f293c481b5325f89be6d207b003382e18a8ecba66fbaf6416c0@33.4.2.1:30303",
  "enode://pubkey@ip:port"
]



geth --identity “LocalTestNode” --rpc --rpcport 8080 --rpccorsdomain “*” --datadir eth-data/data/  --nodiscover --rpcapi db,eth,net,web3,personal --networkid 15 --maxpeers 0 --verbosity 6 init genesis.1.json

geth --identity “LocalTestNode” --rpc  --rpccorsdomain "*" --datadir eth-data/data/  --nodiscover --rpcapi db,eth,net,web3,personal --networkid 1999 --maxpeers 0 console


https://github.com/ethereum/go-ethereum/wiki/Connecting-to-the-network


https://github.com/ethereum/go-ethereum/wiki/Setting-up-private-network-or-local-cluster

https://github.com/ethereum/go-ethereum/wiki/Private-network

geth --rpc --rpccorsdomain "*" --rpcapi="db,eth,net,web3,personal,web3"  --datadir eth-data  --networkid 15 --nodiscover  --unlock 0 --mine 1




geth --identity “LocalTestNode” --rpc  --rpccorsdomain “*” --datadir eth-data/  --nodiscover --rpcapi db,eth,net,web3,personal --networkid 15 --maxpeers 0 --verbosity 6 init genesis.1.json

