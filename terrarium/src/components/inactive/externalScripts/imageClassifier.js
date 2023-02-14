import React, { useState, useEffect } from 'react'
// import './image-classifier.scss'

const ImageClassifier = () => {
  const [result, setResult] = useState({})
  const ml5 = window.ml5

  useEffect(() => {
    // Initialize video element with camera input
    navigator.getUserMedia(
      {
        video: true
      },
      function (localMediaStream) {
        var video = document.querySelector('video');
        video.srcObject = localMediaStream
      }
    )

    // Initialize the Image Classifier method with MobileNet passing the video
    // element as second argument 
    ml5
      .imageClassifier('MobileNet', document.querySelector('video'))
      .then(classifier => loop(classifier))

    // Call to classify, set the results in the component state, 
    // call this function again to create a loop
    const loop = classifier => {
      classifier.classify().then(results => {
        setResult({
          label: results[0].label,
          probability: results[0].confidence.toFixed(4)
        })
        loop(classifier)
      })
    }
  }, [ml5])

  return (
    <div className="image-classifier">
      <h2>Result</h2>
      <section className="classifier__result">
        <span className="classifier__label">Label:</span>
        {result.label || 'Loading...'}
      </section>
      <section className="classifier__result">
        <span className="classifier__probability">Probability:</span>
        {result.probability || 'Loading...'}
      </section>

      <video width="320" height="240" autoPlay></video>
    </div>
  )
}

export default ImageClassifier