export class ApiUtils {
    public static apiUrl = process.env.REACT_APP_API_URL || "http://localhost:8000";

    // public static apiUrl = "http://localhost:8000";

    public static publicUrl(path: string) {
        return this.apiUrl + '/api/authentication/' + path;
    }

    public static localUrl(path: string) {
        return this.apiUrl + '/api/authentication/local/' + path;
    }

    public static authUrl(path: string) {
        return this.apiUrl + '/api/authentication/' + path;
    }

    public static adminUrl(path: string) {
        return this.apiUrl + '/api/authentication/admin/' + path;
    }

    public static adminCourseMSServiceUrl(path: string) {
        return this.apiUrl + '/api/course-management/admin/' + path;
    }

    public static lecturerCourseMSServiceUrl(path: string) {
        return this.apiUrl + '/api/course-management/lecturer/' + path;
    }

    public static studentUrl(path: string) {
        return this.apiUrl + '/api/authentication/student/' + path;
    }

}
