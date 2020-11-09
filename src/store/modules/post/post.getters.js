export default {
  getFormData: (state) => {
    const post = state.post;
    const customAllPosts = post => ({
        title: post.title,
        description: post.description,
        image_path: post.image_path,
        image: null,
        tagList: post.tag_list,
        contents: post.contents,
        contentsHtml: post.contents_html,
    });
    return customAllPosts(post);
  },
};
