export type TUser = {
    _id: string;
    name: string;
    email: string;
    createdAt: string;
    updatedAt: string;
    image: string;
    designation: string;
    phone: string;
    emergencyContact: {
        name: string;
        phone: string;
        relation: string;
    };
    address: string;
};