if [ "$#" -ne 1 ] ; then
  echo "Usage: $0 dockerhub-id" >&2
  echo "assuming it is \"my maker\" id"
  dockerid="architechbootcamp"
 else
  dockerid=$1
fi

echo " building images"
docker build -t todo-ui ../todo-ui
docker build -t todo-api ../todo-api-java
docker build -t user-api ../user-api

# docker rmi $(docker images -f "dangling=true" -q )

docker tag todo-ui:latest $dockerid/todo-ui:v0.3
docker tag todo-api:latest $dockerid/todo-api:v0.3
docker tag user-api:latest $dockerid/user-api:v0.3


echo " Enter your login password to Docker .."
docker login --username $dockerid

echo " .. "
echo " pushing images .. "

docker push  $dockerid/todo-ui:v0.3
docker push  $dockerid/todo-api:v0.3
docker push  $dockerid/user-api:v0.3
