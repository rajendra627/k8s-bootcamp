
if [ "$#" -ne 1 ] ; then
  echo "Usage: $0 namespace" >&2
  echo "assuming it is todoapp"
  kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=todoapp
 else
  todoapp_namespace=$1
  kubectl create namespace $todoapp_namespace
  kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
fi

