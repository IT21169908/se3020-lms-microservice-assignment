const env = {
    PORT: process.env.PORT || 8000,
    DB_URL: process.env.MONGOOSE_URI || "",
    APP_SECRET: process.env.JWT_SECRET || "",
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || "",
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "",
    QUEUE_NAME: "AUTH_QUEUE",
    AUTH_SERVICE: "auth_service",
    COURSE_SERVICE: "course_service",
    LMS_SERVICE: "lms_service",
    NOTIFY_SERVICE: "notify_service",

    COURSE_RPC: "COURSE_RPC",
    AUTH_RPC: "AUTH_RPC",
    NOTIFY_RPC: "NOTIFY_RPC",
    LMS_RPC: "LMS_RPC",
    PAYMENT_RPC: "PAYMENT_RPC",
};
export default env