const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Expense Tracker API',
            version: '1.0.0',
            description: 'API documentation for Expense Tracker application with JWT authentication',
            contact: {
                name: 'API Support',
            },
        },
        servers: [
            {
                url: `http://localhost:${process.env.PORT || 5000}`,
                description: 'Development server',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'User ID',
                        },
                        fullName: {
                            type: 'string',
                            description: 'Full name of the user',
                        },
                        email: {
                            type: 'string',
                            format: 'email',
                            description: 'User email address',
                        },
                        profileImageUrl: {
                            type: 'string',
                            nullable: true,
                            description: 'URL of the profile image',
                        },
                    },
                },
                Income: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Income ID',
                        },
                        userId: {
                            type: 'string',
                            description: 'User ID',
                        },
                        amount: {
                            type: 'number',
                            description: 'Income amount',
                            minimum: 0,
                        },
                        source: {
                            type: 'string',
                            description: 'Income source',
                        },
                        description: {
                            type: 'string',
                            description: 'Income description',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Income date',
                        },
                    },
                },
                Expense: {
                    type: 'object',
                    properties: {
                        _id: {
                            type: 'string',
                            description: 'Expense ID',
                        },
                        userId: {
                            type: 'string',
                            description: 'User ID',
                        },
                        amount: {
                            type: 'number',
                            description: 'Expense amount',
                            minimum: 0,
                        },
                        category: {
                            type: 'string',
                            description: 'Expense category',
                        },
                        description: {
                            type: 'string',
                            description: 'Expense description',
                        },
                        date: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Expense date',
                        },
                    },
                },
                DashboardData: {
                    type: 'object',
                    properties: {
                        summary: {
                            type: 'object',
                            properties: {
                                balance: {
                                    type: 'number',
                                    description: 'Total balance (income - expenses)',
                                },
                                totalIncome: {
                                    type: 'number',
                                    description: 'Total income',
                                },
                                totalExpense: {
                                    type: 'number',
                                    description: 'Total expenses',
                                },
                            },
                        },
                        recentTransactions: {
                            type: 'array',
                            items: {
                                type: 'object',
                            },
                        },
                        last30DaysExpenses: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    category: {
                                        type: 'string',
                                    },
                                    amount: {
                                        type: 'number',
                                    },
                                },
                            },
                        },
                        last60DaysIncome: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    source: {
                                        type: 'string',
                                    },
                                    amount: {
                                        type: 'number',
                                    },
                                },
                            },
                        },
                        expenseDetails: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    category: {
                                        type: 'string',
                                    },
                                    amount: {
                                        type: 'number',
                                    },
                                },
                            },
                        },
                        incomeDetails: {
                            type: 'array',
                            items: {
                                type: 'object',
                                properties: {
                                    source: {
                                        type: 'string',
                                    },
                                    amount: {
                                        type: 'number',
                                    },
                                },
                            },
                        },
                    },
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message',
                        },
                        error: {
                            type: 'string',
                            description: 'Detailed error information',
                        },
                    },
                },
            },
        },
        security: [
            {
                bearerAuth: [],
            },
        ],
    },
    apis: ['./routes/*.js', './controllers/*.js'],
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
