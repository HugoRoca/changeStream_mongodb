"use strict";

require("dotenv").config();

const config = {
    name: "Buscador.ChangeStreamProducto",
    ambiente: "QA",
    country: "PE",
    batchSize: 2000,
    strategyWithoutPersonalization: ["HV"],
    mongodb: {
        clusters: [
            {
                endpoint: process.env.MONGODB_C1,
                countries: {
                    CO: "BelcorpColombia",
                    BO: "BelcorpBolivia",
                    SV: "BelcorpSalvador",
                    PR: "BelcorpPuertoRico"
                }
            },
            {
                endpoint: process.env.MONGODB_C2,
                countries: {
                    PE: "BelcorpPeru",
                    CL: "BelcorpChile",
                    GT: "BelcorpGuatemala",
                    PA: "BelcorpPanama"
                }
            },
            {
                endpoint: process.env.MONGODB_C3,
                countries: {
                    MX: "BelcorpMexico",
                    EC: "BelcorpEcuador",
                    DO: "BelcorpDominicana",
                    CR: "BelcorpCostaRica"
                }
            }
        ]
    },
    elasticsearch: {
        clusters: [
            {
                endpoint: process.env.ELASTIC_C1,
                countries: ["PE", "CL", "CR"],
            },
            {
                endpoint: process.env.ELASTIC_C2,
                countries: ["CO", "PA"],
            },
        ],
        indexName: "producto_v2",
        indexType: "_doc",
        backoffRetries: 3,
        backoffMinSeconds: 3,
        backoffMaxSeconds: 20,
    },
    elasticLogging: {
        endpoint: process.env.URL_LOG,
        pattern: "dev-buscador-estrategia-stream-",
        type: "LogEvent",
        enabledInfo: true,
        enabledError: true,
        application: "LambdaStrategy",
    }
}

module.exports = config;