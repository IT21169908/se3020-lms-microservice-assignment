const env = {
    PORT: process.env.PORT || 8000,
    DB_URL: process.env.MONGOOSE_URI || "",
    APP_SECRET: process.env.JWT_SECRET || "",
    EXCHANGE_NAME: process.env.EXCHANGE_NAME || "",
    MSG_QUEUE_URL: process.env.MSG_QUEUE_URL || "",
    QUEUE_NAME: "NOTIFY_QUEUE",
    AUTH_SERVICE: "auth_service",
    COURSE_SERVICE: "course_service",
    LMS_SERVICE: "lms_service",
    NOTIFY_SERVICE: "notify_service",
};
export default env