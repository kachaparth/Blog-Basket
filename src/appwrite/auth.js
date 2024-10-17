import {Client,Account ,ID} from 'appwrite'
import conf from '../config/conf';
export class AuthService {
    client = new Client()
    account;
   
    constructor(){
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)
        this.account = new Account(this.client);
    }

    async createAccount({email,password,username})
    {
         try {
            const user = await this.account.create(ID.unique(),email,password,username);

            if(user)
            {
                // call a method after sign up
                 await this.login({email,password});
            }
            else
            {
                  return user;
            }
         } catch (error) {
              throw error;
         }
    }


    async login({email,password})
    {
        try {
            return await this.account.createEmailPasswordSession(email,password);
        } catch (error) {
            throw error;
        }
      
    } 

    async currentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log('currentUser error' + error);
        }
        return null;
    }

    async logout()
    {
        try {
             await this.account.deleteSessions();
        } catch (error) {
            console.log('logout error' + error);
        }
    }

}

 const authService = new AuthService()

export default authService;