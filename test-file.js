function render() {
  return (
    <View>
      <Image
        onProgress={(e) => this.setState({progress: Math.round(100 * e.nativeEvent.loaded / e.nativeEvent.total)})}
      />
    </View>
  );
}