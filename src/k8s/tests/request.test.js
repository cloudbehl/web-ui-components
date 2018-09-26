import { createVM } from '../request';
import { rhel75 } from '../mock_templates/rhel75.template';
import { ProcessedTemplatesModel } from '../../models';

const basicSettings = {
  name: {
    value: 'name'
  },
  namespace: {
    value: 'namespace'
  },
  chosenTemplate: rhel75,
  imageSourceType: {
    value: 'Registry'
  },
  registryImage: {
    value: 'imageURL'
  },
  flavor: {
    value: 'small'
  }
};

const basicSettingsCloudInit = {
  name: {
    value: 'name'
  },
  namespace: {
    value: 'namespace'
  },
  chosenTemplate: rhel75,
  imageSourceType: {
    value: 'Registry'
  },
  registryImage: {
    value: 'imageURL'
  },
  flavor: {
    value: 'small'
  },
  cloudInit: {
    value: true
  },
  hostname: {
    value: 'hostname'
  },
  authKeys: {
    value: 'keys'
  }
};

const vmFromURL = {
  name: {
    value: 'name'
  },
  namespace: {
    value: 'namespace'
  },
  description: {
    value: 'desc'
  },
  chosenTemplate: rhel75,
  imageSourceType: {
    value: 'URL'
  },
  imageURL: {
    value: 'httpURL'
  },
  flavor: {
    value: 'small'
  }
};

const vmPXE = {
  name: {
    value: 'name'
  },
  namespace: {
    value: 'namespace'
  },
  description: {
    value: 'desc'
  },
  chosenTemplate: rhel75,
  imageSourceType: {
    value: 'PXE'
  },
  flavor: {
    value: 'small'
  },
  startVM: {
    value: true
  }
};

const processTemplate = template =>
  new Promise((resolve, reject) => {
    const nameParam = template.parameters.find(param => param.name === 'NAME');
    template.objects[0].metadata.name = nameParam.value;
    resolve(template);
  });

export const k8sCreate = (model, resource) => {
  if (model === ProcessedTemplatesModel) {
    return processTemplate(resource);
  }
  return new Promise(resolve => resolve(resource));
};

describe('request.js', () => {
  it('registryImage', () =>
    createVM(k8sCreate, basicSettings).then(vm => {
      expect(vm.metadata.name).toBe(basicSettings.name.value);
      expect(vm.metadata.namespace).toBe(basicSettings.namespace.value);
      expect(vm.spec.template.spec.domain.devices.disks[0].name).toBe('rootdisk');
      expect(vm.spec.template.spec.domain.devices.disks[0].volumeName).toBe('rootvolume');

      expect(vm.spec.template.spec.volumes[0].name).toBe('rootvolume');
      expect(vm.spec.template.spec.volumes[0].registryDisk.image).toBe('imageURL');
      return vm;
    }));
  it('from URL', () =>
    createVM(k8sCreate, vmFromURL).then(vm => {
      expect(vm.metadata.name).toBe(basicSettings.name.value);
      expect(vm.metadata.namespace).toBe(basicSettings.namespace.value);
      expect(vm.spec.template.spec.domain.devices.disks[0].name).toBe('rootdisk');
      expect(vm.spec.template.spec.domain.devices.disks[0].volumeName).toBe('rootvolume');

      expect(vm.spec.template.spec.volumes[0].name).toBe('rootvolume');
      const dataVolumeName = `datavolume-${vmFromURL.name.value}`;
      expect(vm.spec.template.spec.volumes[0].dataVolume.name).toBe(dataVolumeName);

      expect(vm.spec.dataVolumeTemplates[0].metadata.name).toBe(dataVolumeName);
      expect(vm.spec.dataVolumeTemplates[0].spec.source.http.url).toBe(vmFromURL.imageURL.value);
      return vm;
    }));
  it('from PXE', () =>
    createVM(k8sCreate, vmPXE).then(vm => {
      expect(vm.metadata.name).toBe(basicSettings.name.value);
      expect(vm.metadata.namespace).toBe(basicSettings.namespace.value);
      expect(vm.spec.template.spec.domain.devices.interfaces[0].bootOrder).toBe(1);
      return vm;
    }));
  it('with CloudInit', () =>
    createVM(k8sCreate, basicSettingsCloudInit).then(vm => {
      expect(vm.metadata.name).toBe(basicSettings.name.value);
      expect(vm.metadata.namespace).toBe(basicSettings.namespace.value);
      expect(vm.spec.template.spec.domain.devices.disks[1].name).toBe('cloudinitdisk');
      expect(vm.spec.template.spec.domain.devices.disks[1].volumeName).toBe('cloudinitvolume');

      expect(vm.spec.template.spec.volumes[1].name).toBe('cloudinitvolume');
      return vm;
    }));
});
