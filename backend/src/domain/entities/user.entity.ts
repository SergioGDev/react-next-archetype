export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role: string,
        public creationDate: Date,
        public status?: string,
        public idCompany?: string,
        public img?: string,
    ) {}
    
}