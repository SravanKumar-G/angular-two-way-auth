export class User{
    constructor(
        public categories:any,
        public customerName:string,
        public email:string,
        public id: string,
        private _token: string,
        private _tokenExpirationDate: Date,
        public locationId: string,
    ){ }

    get token(){
        if(!this._tokenExpirationDate || new Date() > this._tokenExpirationDate){
            return null;
        }
        return this._token;
    }
}
