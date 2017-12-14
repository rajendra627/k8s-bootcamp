todoapp_namespace="todoapp"
kubectl delete --namespace=$todoapp_namespace -f todo-app.yaml
kubectl delete secret  todoapp-secrets  --namespace=$todoapp_namespace
kubectl delete --namespace=$todoapp_namespace -f todo-config.yaml
kubectl delete namespace $todoapp_namespace
