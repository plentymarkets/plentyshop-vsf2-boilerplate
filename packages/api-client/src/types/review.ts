export declare type ReviewItem = {
    id: number,
    title: string,
    isVisible: true,
    createdAt: string,
    updatedAt: string,
    authorName: string,
    feedbackComment: {
        commentId: string,
        commentRelationType: string,
        commentRelationTargetId: string,
        comment: {
            id: number,
            message: string,
            isVisible: string,
            createdAt: string,
            updatedAt: string
        }
    },
    feedbackRating: {
        ratingId: string,
        ratingRelationType: string,
        ratingRelationTargetId: string,
        rating: {
            id: string,
            ratingValue: string,
            isVisible: string,
            createdAt: string,
            updatedAt: string
        }
    },
    targetRelation: {
        feedbackId: string,
        feedbackRelationType: string,
        feedbackRelationTargetId: string,
        variationAttributes: [],
        targetRelationLabel: string,
        targetRelationName: [],
        feedbackRelationParentTargetId: number
    },
    sourceRelation: [
        feedbackId: string,
        feedbackRelationType: string,
        feedbackRelationSourceId: string,
        sourceRelationLabel: string,
        sourceRelationTypeLabel: string,
        feedback: {
            id: number,
            title: string,
            isVisible: boolean,
            createdAt: string,
            updatedAt: string,
            authorName: string
        }
    ],
    replies: []
};

export type Review = {
    feedbacks: ReviewItem[],
    itemAttributes: [],
    pagination: {
        page: number,
        lastPage: number,
        isLastPage: true
    }
};

export type ReviewSearchParams = {
    productId: string,
    itemId: number
}

export type ReviewAverage = {
    counts: {
      ratingsCountOf1: string,
      ratingsCountOf2: string,
      ratingsCountOf3: string,
      ratingsCountOf4: string,
      ratingsCountOf5: string,
      ratingsCountTotal: string,
      averageValue: string,
      highestCount: string
    }
}
