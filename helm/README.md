# Packaging and deploying K8S applications using Helm #

## Deploying the Todo Application ##

First update the helm [values.yaml](./architech/todo-app/values.yaml) to add your cluster hostname.  The values.yaml file contains values that will be used by the helm template engine to generate the necessary manifest files.

```yaml
  #replace just the IP porion with your IP.
  Host: 192.168.99.100.nip.io
```

From within the helm directory run the following command:

```sh
#1) create the secrets required by the application.  The script will also create a namespace called todo-app

./create_secrets.sh

#2) do a dry run install to make sure everything is ok.
helm install --dry-run --debug architech/todo-app

#3) install the todo-app
helm install --namespace todo-app architech/todo-app

#check that the app has been deployed.  You should see the todo-app has been deployed.
helm ls
```

If you get a message about the tiller versions incompatiblity you can use the following command to upgrade your cluster tiller

```sh
helm init --upgrade
```

> NOTE : You want to give Tiller a chance to upgrade a few seconds before trying to run the install command again, using the watches as recommended above will help you get a visual confirmation of when tiller is ready

## References ##

- [Helm Documenation](https://docs.helm.sh/using_helm/)
- [Debugging Templates](https://github.com/kubernetes/helm/blob/master/docs/chart_template_guide/debugging.md)