
todoapp_namespace="todo-app"

#Create the namespace to deploy the application
kubectl create namespace $todoapp_namespace

#Create the secrets need by the application to access Azure AD
kubectl create secret generic todoapp-secrets --from-file=secrets --namespace=$todoapp_namespace

#Create the configuration object for the todo and user APIs
kubectl create --namespace=$todoapp_namespace -f todo-api-config.yaml
kubectl create --namespace=$todoapp_namesapce -f user-api-config.yaml
kubectl create --namespace=$todoapp_namespace -f todo-ui-config.yaml

#Now create the application
kubectl create --namespace=$todoapp_namespace -f todo-app.yaml
