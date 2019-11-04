"use strict";

const Mdb = require("mongodb");
const config = require("../../config");

class MongoConnection {
    constructor() {
        if (!MongodbConnection.instance) {
            this.connection = {};
            MongodbConnection.instance = this;
        }
        return MongodbConnection.instance;
    }

    getConnection(country) {
        return this.connection[country];
    }

    getCluster(country) {
        for (let i = 0; i < config.mongodb.clusters.length; i++) {
            const item = config.mongodb.clusters[i];
            let keys = Object.keys(item.countries);
            if (keys.some((x) => x === country)) {
                return {
                    endpoint: item.endpoint,
                    country,
                    dataBase: item.countries[country]
                }
            }
        }
    }

    createConnectionPromiseByCountry(country, dataBase, host) {
        return new Promise((resolve, reject) => {
            console.log(country, dataBase, host);
            try {
                if (this.connection[country]) {
                    resolve(this.connection[country]);
                } else {
                    Mdb.connect(host, { useNewUrlParser: true, useUnifiedTopology: true })
                        .then((client) => {
                            this.connection[country] = client.db(dataBase);
                            resolve(this.connection[country]);
                        },
                            (res) => { reject(res); })
                        .catch((err) => { reject(err); });
                }
            } catch (error) {
                console.log(error);
                reject(error);
            }
        });
    }

    getConnectionPromise(country) {
        let promises = [];
        let cluster = this.getCluster(country);

        promises.push(this.createConnectionPromiseByCountry(cluster.country, cluster.dataBase, cluster.endpoint));

        return Promise.all(promises);
    }

    async createConnection(country) {
        let result = false;
        await this.getConnectionPromise(country).then(() => {
            console.log("all connection mongodb successful..");
            result = true;
        }, () => {
            console.log("error creating connections to mongodb...");
        }).catch((err) => {
            console.log(err);
        });
        return result;
    }
}

let instance = new MongoConnection();
Object.freeze(instance);
module.exports = instance;