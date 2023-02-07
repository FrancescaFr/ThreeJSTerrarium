import { initJsPsych } from 'jspsych';
import webgazerInitCamera from '@jspsych/plugin-webgazer-init-camera';
import fullscreen from '@jspsych/plugin-fullscreen';
import htmlButtonResponse from '@jspsych/plugin-html-button-response';
import webgazerCalibrate from '@jspsych/plugin-webgazer-calibrate';
import webgazerValidate from '@jspsych/plugin-webgazer-validate';
import extensionWebgazer from '@jspsych/extension-webgazer'



export default function jsPsychFunction() {

  const jsPsych = initJsPsych({
    extensions: [
      { type: extensionWebgazer }
    ]
  });

  const enter_fullscreen = {
    type: fullscreen,
    fullscreen_mode: true
  }

  const trial_in_fullscreen = {
    type: htmlButtonResponse,
    stimulus: 'This trial will be in fullscreen mode.',
    choices: ['Continue']
  }

  const exit_fullscreen = {
    type: fullscreen,
    fullscreen_mode: false,
    delay_after: 0
  }

  const trial_after_fullscreen = {
    type: htmlButtonResponse,
    stimulus: 'This trial will NOT be in fullscreen mode.',
    choices: ['Continue']
  }

  // const preload = {
  //   type: preload,
  //   images: ['img/blue.png']
  // }

  const camera_instructions = {
    type: htmlButtonResponse,
    stimulus: `
      <p>In order to participate you must allow the experiment to use your camera.</p>
      <p>You will be prompted to do this on the next screen.</p>
      <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
      <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
    `,
    choices: ['Got it'],
  }

  const init_camera = {
    type: webgazerInitCamera
  }

  const calibration_instructions = {
    type: htmlButtonResponse,
    stimulus: `
      <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
      <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
    `,
    choices: ['Got it'],
  }

  const calibration = {
    type: webgazerCalibrate,
    calibration_points: [
      [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    repetitions_per_point: 2,
    randomize_calibration_order: true
  }

  const validation_instructions = {
    type: htmlButtonResponse,
    stimulus: `
      <p>Now we'll measure the accuracy of the calibration.</p>
      <p>Look at each dot as it appears on the screen.</p>
      <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
    `,
    choices: ['Got it'],
    post_trial_gap: 1000
  }

  const validation = {
    type: webgazerValidate,
    validation_points: [
      [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
    ],
    roi_radius: 200,
    time_to_saccade: 1000,
    validation_duration: 2000,
    data: {
      task: 'validate'
    }
  }

  const recalibrate_instructions = {
    type: htmlButtonResponse,
    stimulus: `
      <p>The accuracy of the calibration is a little lower than we'd like.</p>
      <p>Let's try calibrating one more time.</p>
      <p>On the next screen, look at the dots and click on them.<p>
    `,
    choices: ['OK'],
  }

  const recalibrate = {
    timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
    conditional_function: function () {
      const validation_data = jsPsych.data.get().filter({ task: 'validate' }).values()[0];
      return validation_data.percent_in_roi.some(function (x) {
        const minimum_percent_acceptable = 50;
        return x < minimum_percent_acceptable;
      });
    },
    data: {
      phase: 'recalibration'
    }
  }

  const calibration_done = {
    type: htmlButtonResponse,
    stimulus: `
      <p>Great, we're done with calibration!</p>
    `,
    choices: ['OK']
  }

  jsPsych.run([
    enter_fullscreen,
    trial_in_fullscreen,
    trial_after_fullscreen,
    exit_fullscreen,
    // preload,
    camera_instructions,
    init_camera,
    calibration_instructions,
    calibration,
    validation_instructions,
    validation,
    recalibrate,
    calibration_done
  ])

}

// var jsPsych = initJsPsych({
//   extensions: [
//     { type: jsPsychExtensionWebgazer }
//   ]
// });

// var preload = {
//   type: jsPsychPreload,
//   images: ['img/blue.png']
// }

// var camera_instructions = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//       <p>In order to participate you must allow the experiment to use your camera.</p>
//       <p>You will be prompted to do this on the next screen.</p>
//       <p>If you do not wish to allow use of your camera, you cannot participate in this experiment.<p>
//       <p>It may take up to 30 seconds for the camera to initialize after you give permission.</p>
//     `,
//   choices: ['Got it'],
// }

// var init_camera = {
//   type: jsPsychWebgazerInitCamera
// }

// var calibration_instructions = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//       <p>Now you'll calibrate the eye tracking, so that the software can use the image of your eyes to predict where you are looking.</p>
//       <p>You'll see a series of dots appear on the screen. Look at each dot and click on it.</p>
//     `,
//   choices: ['Got it'],
// }

// var calibration = {
//   type: jsPsychWebgazerCalibrate,
//   calibration_points: [
//     [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
//   ],
//   repetitions_per_point: 2,
//   randomize_calibration_order: true
// }

// var validation_instructions = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//       <p>Now we'll measure the accuracy of the calibration.</p>
//       <p>Look at each dot as it appears on the screen.</p>
//       <p style="font-weight: bold;">You do not need to click on the dots this time.</p>
//     `,
//   choices: ['Got it'],
//   post_trial_gap: 1000
// }

// var validation = {
//   type: jsPsychWebgazerValidate,
//   validation_points: [
//     [25, 25], [75, 25], [50, 50], [25, 75], [75, 75]
//   ],
//   roi_radius: 200,
//   time_to_saccade: 1000,
//   validation_duration: 2000,
//   data: {
//     task: 'validate'
//   }
// }

// var recalibrate_instructions = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//       <p>The accuracy of the calibration is a little lower than we'd like.</p>
//       <p>Let's try calibrating one more time.</p>
//       <p>On the next screen, look at the dots and click on them.<p>
//     `,
//   choices: ['OK'],
// }

// var recalibrate = {
//   timeline: [recalibrate_instructions, calibration, validation_instructions, validation],
//   conditional_function: function () {
//     var validation_data = jsPsych.data.get().filter({ task: 'validate' }).values()[0];
//     return validation_data.percent_in_roi.some(function (x) {
//       var minimum_percent_acceptable = 50;
//       return x < minimum_percent_acceptable;
//     });
//   },
//   data: {
//     phase: 'recalibration'
//   }
// }

// var calibration_done = {
//   type: jsPsychHtmlButtonResponse,
//   stimulus: `
//       <p>Great, we're done with calibration!</p>
//     `,
//   choices: ['OK']
// }

// var begin = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: `<p>The next screen will show an image to demonstrate adding the webgazer extension to a trial.</p>
//       <p>Just look at the image while eye tracking data is collected. The trial will end automatically.</p>
//       <p>Press any key to start.</p>
//     `
// }

// var trial = {
//   type: jsPsychImageKeyboardResponse,
//   stimulus: 'img/blue.png',
//   choices: "NO_KEYS",
//   trial_duration: 2000,
//   extensions: [
//     {
//       type: jsPsychExtensionWebgazer,
//       params: { targets: ['#jspsych-image-keyboard-response-stimulus'] }
//     }
//   ]
// }

// var show_data = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: function () {
//     var trial_data = jsPsych.data.getLastTrialData().values();
//     var trial_json = JSON.stringify(trial_data, null, 2);
//     return `<p style="margin-bottom:0px;"><strong>Trial data:</strong></p>
//         <pre style="margin-top:0px;text-align:left;">${trial_json}</pre>`;
//   },
//   choices: "NO_KEYS"
// };

// jsPsych.run([
//   preload,
//   camera_instructions,
//   init_camera,
//   calibration_instructions,
//   calibration,
//   validation_instructions,
//   validation,
//   recalibrate,
//   calibration_done,
//   begin,
//   trial,
//   show_data
// ]);

