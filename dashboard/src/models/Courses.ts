interface ICourse {
    _id: string;
    name: string;
    code: string;
    description: string;
    credits: number;
    fee: number;
    lecture_id: string;
    status: "active" | "inactive";

    [key: string]: string | number
}


export default ICourse