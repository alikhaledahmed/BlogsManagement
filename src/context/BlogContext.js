import createDataContext from './createDataContext';
import jsonServer from '../api/jsonServer';

const blogReducer = (state, action) => {
    switch(action.type) {
        
        case 'get_blogposts':
            return action.payload;

        case 'delete_blogpost':
            return state.filter(post => post.id !== action.payload);
        
        case 'edit_blogpost':
            return state.map(blogPost => {
                return blogPost.id === action.payload.id ? action.payload : blogPost;
            });

        default:
            return state;
    }
};

const getBlogPosts = dispatch => {
    return async () => {
        try {
            const response = await jsonServer.get('/blogposts');
            dispatch({ type: 'get_blogposts', payload: response.data});
            
        } catch (error) {
            console.log(error);            
        }
    };
};

const addBlogPost = dispatch => {
    return async(title, content, callback) => {
        if (title.length && content.length) {
            await jsonServer.post('/blogposts', { title, content });

            if(callback)
                callback();
        }
    };
};

const editBlogPost = dispatch => {
    return async (id, title, content, callback) => {

        if (title.length && content.length) {
            await jsonServer.put(`/blogposts/${id}`, { title, content });
            dispatch({ type: 'edit_blogpost', payload: {id, title, content} });
            
            if(callback)
                callback();
        }
    };
};

const deleteBlogPost = dispatch => {
    return async id => {
        await jsonServer.delete(`/blogposts/${id}`);
        dispatch({ type: 'delete_blogpost', payload: id});
    };
};

export const { Context, Provider } = createDataContext(
    blogReducer,
    { addBlogPost, deleteBlogPost, editBlogPost, getBlogPosts },
    []
);