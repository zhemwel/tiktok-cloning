import React, { Dispatch, SetStateAction } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { GoVerified } from 'react-icons/go'

import useAuthStore from '../store/authStore'
import NoResult from './NoResult'
import { IUser } from '../types'

interface IProps {
    isPostingComment: Boolean
    comment: string
    setComment: Dispatch<SetStateAction<string>>
    addComment: (e: React.FormEvent) => void
    comments: IComment[]
}

interface IComment {
    comment: string
    length: number
    _key: string
    postedBy: {
        _ref: string
        _id: string
    }
}

const Comments = ({ comment, setComment, addComment, comments, isPostingComment }: IProps) => {
    const { userProfile, allUsers } = useAuthStore()

    return (
        <div className="border-t-2 border-gray-200 xss:pt-4 xss:px-10 bg-[#F8F8F8] border-b-2 lg:pb-0">
            <div className="overflow-scroll h-[350px]">
                {
                    comments?.length
                        ? (
                            comments.map((item, idx) => (
                                <div key={`comment-`+idx}>
                                    {
                                        allUsers.map((user: IUser) => (
                                            user._id === (item.postedBy._id || item.postedBy._ref)
                                            ) && (
                                                <div className="pb-4 pl-9 pt-4 items-center" key={user._id+idx}>
                                                    <Link href={`/profile/${user._id}`}>
                                                        <div className="flex items-start gap-3 cursor-pointer">
                                                            <div className="w-8 h-8">
                                                                <Image
                                                                    src={user.image}
                                                                    width={34}
                                                                    height={34}
                                                                    className="rounded-full"
                                                                    alt="User Profile"
                                                                    layout="responsive"
                                                                />
                                                            </div>

                                                            <div>
                                                                <p className="flex gap-1 items-center text-md font-bold text-primary lowercase">
                                                                    {user.userName.replace(/ /g, "")}
                                                                    <GoVerified className="text-blue-400" />
                                                                </p>
                                                                <p className="capitalize text-gray-400 text-xs">
                                                                    {user.userName}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                    <div>
                                                        <p className="text-justify">
                                                            {item.comment}
                                                        </p>
                                                    </div>
                                                </div>
                                            )
                                        )
                                    }
                                </div>
                            ))
                        )
                        : (
                            <NoResult text="No Comment Yet!" />
                        )
                }
            </div>

            {
                userProfile && (
                    <div className="pb-6 px-2 pl-5 md:px-10">
                        <form
                            onSubmit={addComment}
                            className="flex gap-4"
                        >
                            <input
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Add Comment..."
                                className="bg-primary  px-6 py-4 text-md font-medium border-2 w-[100px] md:w-[700px] lg:w-[350px] border-gray-100 focus:outline-none focus:border-2 focus:border-gray-300 flex-1 rounded-lg"
                            />
                            <button
                                className="text-md text-gray-400"
                                onClick={addComment}
                            >
                                {
                                    isPostingComment
                                        ? "Commenting..."
                                        : "Comment"
                                }
                            </button>
                        </form>
                    </div>
                )
            }
        </div>
    )
}

export default Comments