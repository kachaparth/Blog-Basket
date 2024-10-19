import {Client,Account ,ID , Databases,Storage,Query} from 'appwrite'
import conf from '../config/conf';


class Service {
    client = new Client()
    database;
    bucket;
    constructor()
    {
        this.client
        .setEndpoint(conf.appwriteURL)
        .setProject(conf.appwriteProjectId)

         this.database = new Databases(this.client);
         this.bucket = new Storage(this.client);
    }

    async createPost({title,slug,content,featuredImage,status,userId}){
        try {
          return await this.database.createDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
                title,
                slug,
                content,
                featuredImage,
                status,
                userId
            }) 
        } catch (error) {
            console.log("createPost error" + error);
            return false;
        }

    }

    async updatePost(slug,{title,content,featuredImage,status}){
      try {
           return await this.database.updateDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug,{
            title,
            slug,
            content,
            featuredImage,
            status
           })
      } catch (error) {
        console.log("updatePost error" + error);
        return false;
      }
    }

    async deletePost(slug){
        try {
           await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
           return true
        } catch (error) {
            console.log("deletePost error" + error);
            return false
        }
    }

    async getPost(slug){
        try {
          return await this.database.deleteDocument(conf.appwriteDatabaseId,conf.appwriteCollectionId,slug)
       
        } catch (error) {
            console.log("getPost error" + error);
            return false
        }
    }

    async getAllPost(queries = [Query.equal("status", "active")]){
        try {
            return await this.database.listDocuments(conf.appwriteDatabaseId,conf.appwriteCollectionId,
            [
                queries
            ]
            )

        } catch (error) {
            console.log("getAllPost error" + error);
            return false
        }
    }
    async uploadFile(file)
    {
        try {
            return await this.bucket.createFile(conf.appwriteBucketId,ID.unique(),file)
            
        } catch (error) {
            console.log("uploadFile error" + error);
            return false
        }
    }

    async deleteFile(fileId)
    {
        try {
            await this.bucket.deleteFile(conf.appwriteBucketId,fileId)
            return true
        } catch (error) {
            console.log("deleteFile error" + error);
            return false
        }
    }

     preview() {
        return  this.bucket.getFilePreview(conf.appwriteBucketId,fileId)
    }


}

 const service = new Service()
export default service;
