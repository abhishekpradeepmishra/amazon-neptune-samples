import { useState, useEffect, useReducer } from "react";
import { useConfiguration } from './useconfiguration'
import Axios from 'axios'
import Amplify, { Auth } from 'aws-amplify';

export function useVacations() {
    const [vacations, setVacations] = useState([]);
    //const [postComments, setpostComments] = useState<postComment[]>([]);
    //const { getSignedInUser } = useAuth();

    const { API } = useConfiguration();
    const initVacations = async () => {

        const vacations = await Axios.get(API + "/vacations").then((response) => {
            console.log(response);
            return response.data;
        })

        return vacations;
    };

    //for all subsequent calls the UI will invoke this function
    //Make an API call here to get data from server
    //todo: add authentication to call server
    //todo: parse api call and transform in a format supported by UI
    // const getNewPosts = async () => {

    //     const updatedposts = [
    //         {
    //             url: "http://commondatastorage.googleapis.com/gtv-posts-bucket/sample/BigBuckBunny.mp4",
    //             title: "Big Buck Bunny",
    //             likes: "200",
    //             // postDislikes: "11",
    //             author: "By Blender Foundation",
    //             id: '105',
    //             thumbnail: "Big Buck Bunny",
    //             isVideo: false
    //         }
    //         , ...posts]


    //     setPosts(updatedposts);

    // };


    // const updateLikeStatusForPost = async (postId: string) => {
    //     //write code to update likes count for post
    //     const user = await Auth.currentAuthenticatedUser();

    //     if (user !== undefined) {

    //         var postUrl = `${API}/posts/${postId}/likes`;
    //         console.log(postUrl);

    //         var result = await Axios.post(postUrl, JSON.stringify({
    //             data: {
    //                 postId: postId,
    //                 by: user?.username
    //             }
    //         })).then((response) => {
    //             console.log(response);
    //             return true;
    //         }, (error) => {
    //             console.log(error);
    //             return false;
    //         });

    //         return result;
    //     }
    // }

    // const updateCommentForPost = async (comment: PostComment, postId: string) => {

    //     //check if the user is authenticated
    //     //write code to update Comment for post

    //     //const user = await getSignedInUser();

    //     const user = await Auth.currentAuthenticatedUser();

    //     if (user !== undefined) {
    //         comment.by = user?.username;
    //         console.log(JSON.stringify(comment));

    //         var postUrl = `${API}/posts/${postId}/comments`;
    //         console.log(postUrl);

    //         var result = await Axios.post(postUrl, JSON.stringify({
    //             data: comment
    //         })).then((response) => {
    //             console.log(response);
    //             return true;
    //         }, (error) => {
    //             console.log(error);
    //             return false;
    //         });

    //         return result;
    //     }

    //     //make a call to save this
    //     //user this comments to do sentimental analysis of 
    // }

    // const getAllCommentsForPost = async (postId: string, reload: true) => {

    //     //write code to get comments for a post
    //     return [{
    //         Id: "c-101",
    //         comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         by: "user101"
    //     },
    //     {
    //         Id: "c-102",
    //         comment: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    //         by: "user102"
    //     }];
    // }

    return {
        // getNewPosts,
        initVacations
        // ,
        // updateLikeStatusForPost,
        // updateCommentForPost,
      
    };
}