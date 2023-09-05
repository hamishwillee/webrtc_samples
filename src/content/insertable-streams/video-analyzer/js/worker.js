console.log("I was loaded");

onmessage = function (e) {
  console.log("Worker: Message received from main script");
  //postMessage(e.data[0]);
  postMessage("HAPPY DAZE");
};

addEventListener("rtctransform", (event) => {
  console.log("Worker: Transform event called");
  const transform = new TransformStream({
    start() {
      console.log("Worker: Transform start() called");
    }, // Called on startup.
    flush() {
      console.log("Worker: Transform flush() called");
    }, // Called when the stream is about to be closed.
    async transform(encodedFrame, controller) {
      // Reconstruct the original frame.

      console.log("Worker: Transform function called");
      const imageMeta = encodedFrame.getMetadata();
      console.log(imageMeta);
      postMessage(imageMeta);
      controller.enqueue(encodedFrame);
    },
  });

  event.transformer.readable
    .pipeThrough(transform)
    .pipeTo(event.transformer.writable);
});
