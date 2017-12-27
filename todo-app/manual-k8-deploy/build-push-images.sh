if [ "$#" -ne 2 ] ; then
  echo "Usage: $0 dockerhub-id version" >&2
  echo "assuming it is \"my maker\" id"
  dockerid="architechbootcamp"
  version="v0.x"
 else
  dockerid=$1
  version=$2
fi

echo " building images"
docker build -t todo-ui ../todo-ui
docker build -t todo-api ../todo-api-java
docker build -t user-api ../user-api

# docker rmi $(docker images -f "dangling=true" -q )

docker tag todo-ui:latest $dockerid/todo-ui:$version
docker tag todo-api:latest $dockerid/todo-api:$version
docker tag user-api:latest $dockerid/user-api:$version


echo " Enter your login password to Docker .."
docker login --username $dockerid

echo " .. "
echo " pushing images .. "

docker push  $dockerid/todo-ui:$version
docker push  $dockerid/todo-api:$version
docker push  $dockerid/user-api:$version
