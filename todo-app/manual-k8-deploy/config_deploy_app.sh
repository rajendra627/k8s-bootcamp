
todoapp_namespace="todo-app"
kubectl create namespace $todoapp_namespace
kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
kubectl create --namespace=$todoapp_namespace -f todo-api-config.yaml
kubectl create --namespace=$todoapp_namesapce -f user-api-config.yaml
kubectl create --namespace=$todoapp_namespace -f todo-app.yaml
