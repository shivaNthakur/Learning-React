import conf from "../conf/conf.js";
import { Client, ID, Databases, Query } from "appwrite";

export class dataService {
    client = new Client();
    databases;

    constructor( ) {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client);
    }


//A slug is a URL-friendly, human-readable identifier typically used in website URLs to represent titles or names. It makes links cleaner, easier to read, SEO-friendly, and safer for routing systems.


    async createPost({title, slug, content, featuredImage, status, userId}) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug, //whichever slug we pass is considered as document id.

                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                }

            )
        } catch (error) {
            console.log("Appwrite serive :: createPost :: error", error);
        }
    }

    // we are passing slug seprately because we want first the document_ID if we pass in object then we first have to abstract it from object.

    // if we give user id also parameter then we could allow other users also to addit in post with self.

    async updatePost (slug, {title, content, featuredImage, status}) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
             console.log("Appwrite serive :: updatePost :: error", error);
        }

    }

    async deletePost (slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug

            )
        } catch (error) {
            console.log("Appwrite serive :: deletePost :: error", error);
            return false
        }
    }

    async getPost(slug) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,

            )
        } catch (error) {
            console.log("Appwrite serive :: getPost :: error", error);
            return false
        }
    }

    // if I take list document to get all post then we will also get the document which are not active now,  so we will use QUERY.
    // learn what is enum.

    async getPosts (queries = [Query.equal("status","active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries,

            )
        } catch (error) {
            console.log("Appwrite serive :: getPosts :: error", error);
            return false
        }
    }


}





const dataservice = new dataService();

export default dataservice;