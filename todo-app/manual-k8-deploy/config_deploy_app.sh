
todoapp_namespace="todoapp"
kubectl create namespace $todoapp_namespace
kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
kubectl create --namespace=$todoapp_namespace -f todo-config.yaml
kubectl create --namespace=$todoapp_namespace -f todo-app.yamlc
