
if [ "$#" -ne 1 ] ; then
  echo "Usage: $0 namespace" >&2
  echo "assuming it is todoapp"
  kubectl create secret generic todoapp-secrets --from-file=secrets
 else
  todoapp_namespace=$1
  kubectl --kubeconfig ~/.kube/acsGenerated.config create namespace $todoapp_namespace
  kubectl --kubeconfig ~/.kube/acsGenerated.config create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace
fi

