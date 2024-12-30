import React, { useState } from 'react';
import { MessageSquare, Send, Edit2, Trash2 } from 'lucide-react';
import { useTaskComments } from '../../hooks/useTaskComments';
import { useAuth } from '../../contexts/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import { Tooltip } from '../ui/Tooltip';

interface TaskCommentsProps {
  taskId: string;
}

export function TaskComments({ taskId }: TaskCommentsProps) {
  const { comments, loading, addComment, editComment, removeComment } = useTaskComments(taskId);
  const [newComment, setNewComment] = useState('');
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await addComment(newComment.trim());
      setNewComment('');
    } catch (error) {
      console.error('Failed to add comment:', error);
    }
  };

  const handleEdit = async (id: string) => {
    if (!editContent.trim()) return;

    try {
      await editComment(id, editContent.trim());
      setEditingComment(null);
      setEditContent('');
    } catch (error) {
      console.error('Failed to edit comment:', error);
    }
  };

  if (loading) {
    return <div className="text-center py-4 text-gray-500">Loading comments...</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
        <MessageSquare className="h-5 w-5" />
        <h3 className="text-lg font-medium">Comments</h3>
      </div>

      <div className="space-y-4">
        {comments.map(comment => (
          <div key={comment.id} className="group bg-spotify-base/50 rounded-lg p-4">
            {editingComment === comment.id ? (
              <form onSubmit={(e) => { e.preventDefault(); handleEdit(comment.id); }}>
                <textarea
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                  className="w-full p-2 rounded-md bg-spotify-base border border-spotify-divider focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
                  rows={2}
                />
                <div className="flex justify-end space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={() => setEditingComment(null)}
                    className="text-sm text-spotify-light hover:text-spotify-lightest"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="text-sm text-spotify-green hover:text-opacity-80"
                  >
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <>
                <p className="text-gray-200 mb-2">{comment.content}</p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>{formatDistanceToNow(comment.createdAt, { addSuffix: true })}</span>
                  {user?.id === comment.userId && (
                    <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <Tooltip content="Edit comment">
                        <button
                          onClick={() => {
                            setEditingComment(comment.id);
                            setEditContent(comment.content);
                          }}
                          className="p-1 hover:text-spotify-green rounded-full transition-colors"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                      </Tooltip>
                      <Tooltip content="Delete comment">
                        <button
                          onClick={() => removeComment(comment.id)}
                          className="p-1 hover:text-red-500 rounded-full transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        ))}

        <form onSubmit={handleSubmit} className="flex items-center space-x-2">
          <input
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 rounded-full px-4 py-2 bg-spotify-base border border-spotify-divider focus:border-spotify-green focus:ring-spotify-green text-spotify-lightest"
          />
          <Tooltip content="Send comment">
            <button
              type="submit"
              disabled={!newComment.trim()}
              className="p-2 text-spotify-light hover:text-spotify-green disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-colors"
            >
              <Send className="h-5 w-5" />
            </button>
          </Tooltip>
        </form>
      </div>
    </div>
  );
}