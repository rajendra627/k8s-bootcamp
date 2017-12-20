# Storage #

For those applications that need to manage durable state, particularly, state that survives across container restarts, K8S provides the volume resource - there are multiple volume types such as NFS, [Azure Disk](https://github.com/kubernetes/examples/tree/master/staging/volumes/azure_disk), [Azure File](https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_file/README.md), and more.   

To the containers, volumes are just directory on the disk.  The Docker image is at the root of the file system, and you can mount multiple volumes at specified paths within the image.  Each container in the pod must independently specify where to mount each volume.  

See the [Volume reference at K8S.io](https://kubernetes.io/docs/concepts/storage/volumes/) for more details.

See [here](https://github.com/kubernetes/examples/blob/master/staging/volumes/azure_disk/azure.yaml) for an example of a pod that uses Azure Disk volumes.  Notice how you must first specify the volume, then mount the volume within your container specification.  How you specify the volume depends on the volume type.

## Persistent Volumes & Persistent Volume Claims ##

With Volumes the life-cycle of the storage is tied to the pod.  This means the volume survives container restarts, however, if the pod is destroyed, the volume storage will be blown away. This is not appropriate for applications such as databases that require the data is saved even if the pod is rescheduled to another node.






## References ##

- [Volumes](https://kubernetes.io/docs/concepts/storage/volumes/)
- [Persistent Volumes](https://kubernetes.io/docs/concepts/storage/persistent-volumes/)
- [Storage Classes](https://kubernetes.io/docs/concepts/storage/storage-classes/)
- [Dynamic Volume Provisioning](https://kubernetes.io/docs/concepts/storage/dynamic-provisioning/)