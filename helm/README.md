# Packaging and deploying K8S applications using Helm #

## Deploying the Todo Application ##

From within the helm directory run the following command:

```sh
#1) Create a namespace to deploy your app.
kubectl create namespace <namespace>

#2) Create secrets required by the app in the same namespace
./create_secrets.sh <namespace>

#3) do a dry run install to make sure everything is ok. Replace <your_ip> with the IP for your cluster loadbalancer.  The --set flag overrides values for specified keys in your values.yaml file.  This command will echo out the manifests that will be deployed. Review it carefully.
helm install --dry-run --debug --set Global.Host=<your_ip>.nip.io architech/todo-app

#4) install the todo-app
helm install --namespace todo-app --set Global.Host<your_ip>.nip.io architech/todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls
```

If you get a message about the tiller versions incompatiblity you can use the following command to upgrade your cluster tiller

```sh
helm init --upgrade
```

> NOTE : You want to give Tiller a chance to upgrade a few seconds before trying to run the install command again, using the watches as recommended above will help you get a visual confirmation of when tiller is ready

## Some Key Points ##

Helm will deploy the resources in the templates directory in the order they are listed. This is key as in some cases, ordering does matter.  For example, notice I have some files prefixed with a number.

```sh
1.ingress-role.yaml
2.ingress-role-binding.yaml
```

This is done because the role has to exist before the role can be bound to a subject.

## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/)
- [Debugging Templates](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/debugging.md)