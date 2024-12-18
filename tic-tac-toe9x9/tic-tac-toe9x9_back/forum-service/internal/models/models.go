package models

type Post struct {
	Id      int    `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
	Author  string `json:"login"`
}

type Comment struct {
	Post_id int    `json:"post_id"`
	Author  string `json:"login"`
	Content string `json:"content"`
}

type AnswerPost struct {
	Post_id int    `json:"post_id"`
	Error   string `json:"error"`
}

type AnswerComment struct {
	Comment_id int    `json:"comment_id"`
	Error      string `json:"error"`
}

type AnswerGetCountOfPosts struct {
	Count int    `json:"count"`
	Error string `json:"error"`
}

type AnswerPage struct {
	Posts    []Post `json:"posts"`
	Total    int    `json:"total"`
	PageSize int    `json:"page_size"`
	Page     int    `json:"page"`
	Error    string `json:"error"`
}
