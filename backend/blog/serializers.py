from rest_framework import serializers
from .models import Post, Comment


class PostSerializer(serializers.ModelSerializer):

    class Meta:
        model = Post
        fields = ['id', 'title', 'content', 'created_at', 'author']
        read_only_fields = ['author', 'created_at']


class CommentSerializer(serializers.ModelSerializer):

    class Meta:
        model = Comment
        fields = ['id', 'comment', 'created_at', 'post', 'user']
        read_only_fields = ['user', 'created_at']