apt-get install software-properties-common 
add-apt-repository -y ppa:ethereum/ethereum 
apt-get update 
apt-get install ethereum 


geth --datadir eth-data --networkid 15 


## Build 
docker build -t eth .
## RUN 
docker run --rm -it --net=ETH --name Node_one  -p 8545:8545 eth:latest;
