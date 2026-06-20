from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response

from .models import Post, Comment
from .serializers import PostSerializer, CommentSerializer


@api_view(['GET', 'POST'])
def posts(request):

    if request.method == 'GET':
        posts = Post.objects.all().order_by('-created_at')
        serializer = PostSerializer(posts, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        if not request.user.is_authenticated:
            return Response(
                {"message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = PostSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(author=request.user)
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


@api_view(['GET', 'POST'])
def comments(request, post_id):

    if request.method == 'GET':
        comments = Comment.objects.filter(post_id=post_id)
        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    if request.method == 'POST':

        if not request.user.is_authenticated:
            return Response(
                {"message": "Authentication required"},
                status=status.HTTP_401_UNAUTHORIZED
            )

        serializer = CommentSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save(
                user=request.user,
                post_id=post_id
            )
            return Response(serializer.data)

        return Response(serializer.errors, status=400)


@api_view(['GET'])
@permission_classes([AllowAny])
def health(request):
    return Response({
        "status": "ok"
    })


@api_view(['GET'])
@permission_classes([AllowAny])
def readiness(request):
    return Response({
        "status": "ready"
    })
#comment