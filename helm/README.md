# Packaging and deploying K8S applications using Helm #

## Deploying the Todo Application ##

Before following the instructions below, you first need to know the version of K8S cluster.  To find out the version, run `kubectl version`.  It will show the client and server version.

**NOTE: If you are deploying to AKS, move the files described below out of the templates directory prior to executing helm.  This is because AKS does not support RBAC.**

You then need to uncomment the apiVersion in the following files to reflect the server version:

- [architech/todo-app/templates/1-ingress-role.yaml](./architech/todo-app/templates/1-ingress-role.yaml)
- [architech/todo-app/templates/2-ingress-role-binding.yaml](./architech/todo-app/templates/1-ingress-role.yaml)

```yaml
#apiVersion: rbac.authorization.k8s.io/v1 #for v1.8.0++
apiVersion: rbac.authorization.k8s.io/v1beta1 #for v1.7.x
```

You then need the IP to your K8S cluster.  How you do so depends on where you deployed the cluster.

- For minikube, just run `minikube ip`
- For ACS or AKS, deploy as is then we will update the manifest after the external Loadbalancer IP is provided.

You will use this IP in step #3 below.

From within the helm directory run the following command:

```sh
#1) Create a namespace to deploy your app.
kubectl create namespace <namespace>

#2) Create secrets required by the app in the same namespace
./create_secrets.sh <namespace>

#3) do a dry run install to make sure everything is ok. Replace <your_ip> with the IP for your cluster loadbalancer.  The --set flag overrides values for specified keys in your values.yaml file.  This command will echo out the manifests that will be deployed. Review it carefully.
helm install --dry-run --debug --set Global.Host=<your_ip>.nip.io architech/todo-app

#4) install the todo-app
helm install --namespace todo-app --set Global.Host=<your_ip>.nip.io architech/todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls

#If you get a message about the tiller versions incompatiblity you can use the following command to upgrade your cluster tiller

helm init --upgrade
```

If deploying to ACS or AKS, run `kubectl get services --namespace todo-app` to get the external IP of the nginx-ingress service.  Your output will look similar to mine.

```sh
NAME                   TYPE           CLUSTER-IP     EXTERNAL-IP    PORT(S)        AGE
default-http-backend   ClusterIP      10.0.14.155    <none>         80/TCP         15m
mongodb                ClusterIP      10.0.31.188    <none>         27017/TCP      15m
nginx-ingress          LoadBalancer   10.0.155.10    52.235.38.16   80:30043/TCP   15m
todo-api               ClusterIP      10.0.85.46     <none>         8080/TCP       15m
todo-webui-service     ClusterIP      10.0.43.113    <none>         80/TCP         15m
user-api               ClusterIP      10.0.193.165   <none>         8082/TCP       15m
```
Then update the ingress resource to reflect the external IP.

```sh
#this will load the yaml manifest in your editor.
kubectl edit ingress/todo-app-ingress --namespace todo-app
```

Update the `host:...` field with your `EXTERNAL-IP.nip.io` and save the file. kubectl will update the ingress with the new value.  Note, the host field only accepts a valid DNS name, IP addresses are not allowed.

> NOTE : You want to give Tiller a chance to upgrade a few seconds before trying to run the install command again, using the watches as recommended above will help you get a visual confirmation of when tiller is ready

## Some Key Points ##

Helm will deploy the resources in the templates directory in the order they are listed. In some cases, ordering does matter.  For example, notice I have some files prefixed with a number.

```sh
1.ingress-role.yaml
2.ingress-role-binding.yaml
```

This is done because the role has to exist before the role can be bound to a subject.

## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/)
- [Debugging Templates](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/debugging.md)