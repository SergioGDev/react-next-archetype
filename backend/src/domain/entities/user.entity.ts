export class UserEntity {

    constructor(
        public id: string,
        public name: string,
        public surname: string,
        public email: string,
        public role: string,
        public creationDate: Date,
        public status: string,
        public idGroup?: string,
        public img?: string,
    ) {}
    
}