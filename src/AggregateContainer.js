function filterVariables(component, variableMapping) {
  const result = {};
  for (const [name, value] of Object.entries(variableMapping)) {
    if (component.hasVariable(name)) {
      result[name] = value;
    }
  }

  return result;
}

export default class AggregateContainer {
  constructor(fragmentSpecs) {
    this.fragmentSpecs = fragmentSpecs;
  }

  getFragmentNames() {
    return Object.keys(this.fragmentSpecs);
  }

  getFragment(fragmentName, variableMapping) {
    const { component, queryName } = this.fragmentSpecs[fragmentName];

    return component.getFragment(queryName, filterVariables(component, variableMapping));
  }

  hasFragment(fragmentName) {
    return !!this.fragmentSpecs[fragmentName];
  }

  hasVariable(variableName) {
    return true;
  }
}
