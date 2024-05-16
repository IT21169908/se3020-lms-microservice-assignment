interface Enrollment {
    _id: string;
    // _id: string;
    // name: string;
    // email: string;
    // phone: string;
    // role: Role;
    // permissions?: Permission[];
    // signedUpAs?: string;
    // lastLoggedIn: string;
    // photo?: IUpload;
    courseId: string;
    createdAt: string;
    enrollmentDate: string;
    learnerId: string;
    status: string;


    [key: string]: string | number|void
}

export default Enrollment;
