const axios = require("axios");

const LOG_API = "http://4.224.186.213/evaluation-service/logs";

async function Log(stack, level, packageName, message) {
    try {
        const response = await axios.post(
            LOG_API,
            {
                stack,
                level,
                package: packageName,
                message
            },
            {
                headers: {
                    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4MDg4NywiaWF0IjoxNzgyMzc5OTg3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiZjM5MjZkNjgtM2U0YS00NTdjLWE5MzctMWQ2NGUyZjdkZjRlIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VudXB1ZGkgZHVyZ2EgbWFkaHVyeWEiLCJzdWIiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODcifSwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsIm5hbWUiOiJndW51cHVkaSBkdXJnYSBtYWRodXJ5YSIsInJvbGxObyI6IjI0YjA1YTA1MDgiLCJhY2Nlc3NDb2RlIjoiYWhYanZwIiwiY2xpZW50SUQiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODciLCJjbGllbnRTZWNyZXQiOiJHU1J2ZHNZR2NaR2N1aGJqIn0.iFRbFsqZrwyxBXQjd1ylEgm_53XJAlZlY4II1VP-1mM`,
                    "Content-Type": "application/json"
                }
            }
        );

        console.log("Logger Success:", response.data);

        return response.data;

    } catch (err) {

        console.log("Status:", err.response?.status);
        console.log("Response:", err.response?.data);
        console.log("Message:", err.message);

        throw err;
    }
}

module.exports = Log;