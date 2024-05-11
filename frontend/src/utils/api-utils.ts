export class ApiUtils {

    public static apiUrl = "http://localhost:5000";

    public static publicUrl(path: string) {
        return this.apiUrl + '/api/public/' + path;
    }

    public static localUrl(path: string) {
        return this.apiUrl + '/api/local/' + path;
    }

    public static authUrl(path: string) {
        return this.apiUrl + '/api/auth/' + path;
    }

    public static adminUrl(path: string) {
        return this.apiUrl + '/api/admin/' + path;
    }

}
