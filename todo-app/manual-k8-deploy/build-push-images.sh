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

# docker rmi $(docker images -f "dangling=true" -q )

docker tag todo-ui:latest $dockerid/todo-ui:stable
docker tag todo-api:latest $dockerid/todo-api:stable


echo " Enter your login password to Docker .."
docker login --username $dockerid

echo " .. "
echo " pushing images .. "

docker push  $dockerid/todo-ui:stable
docker push  $dockerid/todo-api:stable