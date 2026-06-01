import type { Concept } from "@/types/concept";
import { eq } from "./helpers";

export const deploymentLessons: Partial<Record<string, Partial<Concept>>> = {
  quantization: {
    coreMeaning:
      "Quantization maps floating-point weights and activations to lower-precision integer representations—commonly float32 to int8—to reduce memory footprint and accelerate inference.",
    workflowLocation:
      "Optimization stage after training and before export to embedded or edge runtimes.",
    functionRole:
      "Reduces model size and inference latency with controlled accuracy trade-off.",
    mechanism:
      "Affine mapping scales floating values to integer ranges using scale and zero-point parameters. Post-training quantization calibrates ranges on sample data; quantization-aware training simulates quantization during training.",
    equation: eq(
      "q = round(x / scale) + zero_point",
      "Floating value x is scaled, rounded, and offset to produce integer q.",
      "At inference, integers are dequantized back to approximate floats. Scale and zero_point are chosen per tensor to minimize rounding error.",
      [
        { symbol: "x", meaning: "Original floating-point value" },
        { symbol: "q", meaning: "Quantized integer value" },
        { symbol: "scale", meaning: "Step size of the quantization grid" },
        { symbol: "zero_point", meaning: "Integer value representing floating zero" },
      ],
      "Re-validate accuracy on representative hardware after quantization; int8 is standard for edge deployment."
    ),
    example:
      "A vision model converts to int8 TFLite, cutting weight storage roughly fourfold with a one-point accuracy drop on validation.",
    commonDistinction:
      "Numeric precision reduction versus pruning (removing weights) or distillation (transferring knowledge to a smaller model).",
    limitation:
      "May shift outputs; requires deployment verification on target hardware with representative inputs.",
    learnBefore: ["model-compression", "inference"],
    learnAfter: ["tflite", "deployment-verification"],
  },
  pruning: {
    coreMeaning:
      "Pruning removes weights, neurons, or entire structures with minimal impact on accuracy, reducing model size and inference compute.",
    workflowLocation:
      "Model compression after initial training and before deployment to resource-constrained targets.",
    functionRole:
      "Eliminates redundant parameters to shrink memory footprint and reduce inference compute cost.",
    mechanism:
      "Magnitude-based pruning zeroes small weights; structured pruning removes entire channels or filters. Fine-tuning after pruning often recovers accuracy.",
    example:
      "Thirty percent of smallest convolution filters are pruned in a keyword-spotting network, then briefly retrained to restore wake-word accuracy.",
    commonDistinction:
      "Structural removal of parameters versus quantization, which keeps topology but reduces numeric precision.",
    limitation:
      "Aggressive pruning collapses accuracy unless followed by retraining or combined with distillation.",
    learnBefore: ["neural-network", "model-compression"],
    learnAfter: ["quantization", "knowledge-distillation"],
  },
  "knowledge-distillation": {
    coreMeaning:
      "Knowledge distillation trains a smaller student model to mimic a larger teacher's soft probability outputs, transferring knowledge beyond hard class labels.",
    workflowLocation:
      "Model compression when a large accurate model exists but deployment requires a smaller network.",
    functionRole:
      "Transfers rich teacher predictions to a compact student that fits deployment constraints.",
    mechanism:
      "Student is trained on a combined loss: hard labels plus soft targets (teacher logits softened by temperature). Soft targets encode inter-class similarity.",
    equation: eq(
      "L = α · L_hard + (1 − α) · L_soft",
      "Total loss blends hard-label cross-entropy with soft-label distillation loss.",
      "Temperature T softens teacher probabilities, exposing dark knowledge about relative class similarities beyond the top class.",
      [
        { symbol: "L_hard", meaning: "Loss against ground-truth labels" },
        { symbol: "L_soft", meaning: "Loss against teacher soft targets" },
        { symbol: "α", meaning: "Balance between hard and soft losses" },
      ]
    ),
    example:
      "A large transformer teacher trains a six-layer student on the same task, preserving ninety-six percent of teacher accuracy at one-fifth the size.",
    commonDistinction:
      "Teacher-student transfer versus pruning or quantization, which compress the same architecture rather than training a new smaller one.",
    limitation:
      "Student capacity may be insufficient for complex tasks; distillation adds a training phase and requires teacher access.",
    learnBefore: ["neural-network", "loss-function"],
    learnAfter: ["quantization", "tinyml"],
  },
  "model-compression": {
    coreMeaning:
      "Model compression encompasses techniques—quantization, pruning, distillation, architecture search—that reduce model size, latency, and energy consumption for deployment.",
    workflowLocation:
      "Optimization stage after training validation and before export to target hardware.",
    functionRole:
      "Makes models feasible on edge devices, mobile platforms, and cost-sensitive cloud inference.",
    mechanism:
      "Techniques may be combined: distill to a smaller architecture, prune redundant weights, then quantize to int8 for the target runtime.",
    example:
      "A speech model is distilled to a smaller CNN, pruned by twenty percent, and quantized to int8 for deployment on a smart speaker MCU.",
    commonDistinction:
      "Holistic size and latency reduction versus any single technique applied in isolation.",
    limitation:
      "Each technique introduces accuracy risk; combined compression requires careful validation on target hardware.",
    learnBefore: ["inference", "neural-network"],
    learnAfter: ["quantization", "pruning", "knowledge-distillation"],
  },
  onnx: {
    coreMeaning:
      "ONNX (Open Neural Network Exchange) is an open format for representing machine learning models, enabling export from one training framework and import into another runtime.",
    workflowLocation:
      "Model export after training and before deployment to ONNX Runtime, TensorRT, or other compatible engines.",
    functionRole:
      "Provides framework-agnostic model exchange to decouple training environment from deployment runtime.",
    mechanism:
      "Models are exported as computation graphs with standardized operators. Runtimes optimize and execute the graph on CPU, GPU, or specialized accelerators.",
    example:
      "A PyTorch classifier exports to ONNX and runs in ONNX Runtime on a Windows edge server with GPU acceleration.",
    commonDistinction:
      "Portable graph format versus framework-native formats tied to PyTorch or TensorFlow exclusively.",
    limitation:
      "Not every custom operator exports cleanly; validation is required after conversion.",
    learnBefore: ["inference", "model"],
    learnAfter: ["deployment-verification", "quantization"],
  },
  tflite: {
    coreMeaning:
      "TensorFlow Lite is a deployment runtime for on-device inference, supporting model conversion, operator fusion, and hardware delegates for mobile and embedded targets.",
    workflowLocation:
      "Model conversion and deployment after training and optimization for Android, iOS, or embedded Linux.",
    functionRole:
      "Delivers optimized inference on mobile and edge devices with small binary footprint.",
    mechanism:
      "Models convert to FlatBuffer .tflite format with optional int8 or float16 quantization. GPU, NNAPI, or CoreML delegates accelerate execution on supported hardware.",
    example:
      "An object detection model converts to TFLite with int8 quantization and runs on an Android app at thirty frames per second.",
    commonDistinction:
      "Mobile and edge runtime versus full TensorFlow serving for datacenter deployment.",
    limitation:
      "Operator support subset; complex models may require graph surgery or operator customization.",
    learnBefore: ["quantization", "inference"],
    learnAfter: ["tflm", "deployment-verification"],
  },
  tflm: {
    coreMeaning:
      "TensorFlow Lite Micro is a runtime for running inference on microcontrollers and deeply embedded systems with kilobytes of RAM and no operating system.",
    workflowLocation:
      "Final deployment stage for MCU-based TinyML applications after model compression and conversion.",
    functionRole:
      "Executes quantized models on bare-metal or RTOS firmware with statically allocated memory.",
    mechanism:
      "Models compile into C++ source with a fixed tensor arena. No dynamic memory allocation at inference; operators execute sequentially on the MCU.",
    example:
      "A gesture recognition model runs on an ARM Cortex-M4 with 128 KB SRAM using TFLite Micro without cloud connectivity.",
    commonDistinction:
      "Microcontroller runtime with static memory versus TFLite for mobile OS platforms with dynamic allocation.",
    limitation:
      "Severe memory constraints; model architecture and operator set must fit within device limits.",
    learnBefore: ["tflite", "quantization"],
    learnAfter: ["embedded-c", "deployment-verification"],
  },
  tinyml: {
    coreMeaning:
      "TinyML denotes machine learning inference on microcontrollers and deeply embedded devices under strict latency, SRAM, flash, firmware, and power budgets.",
    workflowLocation:
      "Deployment planning after model selection, compression, conversion, and on-device verification.",
    functionRole:
      "Enables intelligent behavior on devices without cloud connectivity, continuous networking, or datacenter compute.",
    mechanism:
      "Models are compressed, converted to embedded runtimes, and integrated into firmware with fixed memory arenas and deterministic inference timing.",
    example:
      "Vibration anomaly detection runs on a sensor MCU, waking the device only when the score exceeds a threshold.",
    commonDistinction:
      "On-device kilobyte-scale inference versus cloud or mobile deployment with megabytes of RAM.",
    limitation:
      "Severe constraints force accuracy-latency-memory trade-offs; not every trained model fits without architectural change.",
    learnBefore: ["quantization", "tflm"],
    learnAfter: ["embedded-c", "hardware-aware-selection"],
  },
  "embedded-c": {
    coreMeaning:
      "Embedded C deployment integrates trained model inference into C or C++ firmware running on microcontrollers, typically via TFLite Micro or vendor-specific runtimes.",
    workflowLocation:
      "Final integration stage after model conversion and verification, before firmware release.",
    functionRole:
      "Delivers production inference as part of device firmware with deterministic timing and memory usage.",
    mechanism:
      "Converted model compiles to C arrays or loads from flash. Inference functions are called from the main loop or interrupt handlers with preallocated buffers.",
    example:
      "Keyword spotting inference runs in a timer interrupt on an MCU, processing twenty-millisecond audio frames and setting a wake flag.",
    commonDistinction:
      "Bare-metal firmware integration versus Python or mobile app deployment with managed runtimes.",
    limitation:
      "Debugging is harder than desktop environments; numeric parity with training must be verified on device.",
    learnBefore: ["tflm", "quantization"],
    learnAfter: ["deployment-verification", "hardware-aware-selection"],
  },
  "hardware-aware-selection": {
    coreMeaning:
      "Hardware-aware model selection chooses architectures and compression strategies jointly with target device constraints on latency, SRAM, flash, and power—not accuracy alone.",
    workflowLocation:
      "Model selection and optimization before committing to an embedded deployment path.",
    functionRole:
      "Ensures the chosen model actually runs within device resource limits at required latency.",
    mechanism:
      "Candidate models are profiled on representative hardware. Pareto analysis trades accuracy against memory, latency, and energy.",
    example:
      "Three classifiers are profiled on the production MCU; the shallowest forest meeting sub-ten-millisecond inference and 128 KB flash is selected.",
    commonDistinction:
      "Deployment-feasible selection versus offline leaderboard accuracy without hardware constraints.",
    limitation:
      "Profiling is device-specific; results do not transfer across different MCUs or accelerators.",
    learnBefore: ["tinyml", "model-compression"],
    learnAfter: ["quantization", "deployment-verification"],
  },
  "deployment-verification": {
    coreMeaning:
      "Deployment verification confirms that inference outputs remain consistent across the training framework, exported runtime, and on-device execution within documented tolerance.",
    workflowLocation:
      "After model export and before production sign-off on embedded or edge targets.",
    functionRole:
      "Detects numerical drift, preprocessing mismatches, and export errors before release.",
    mechanism:
      "Identical inputs are run through Python reference, exported C or TFLite, and firmware. Outputs are compared element-wise within quantization tolerance.",
    example:
      "Fifty logged test vectors are asserted to match within int8 tolerance between Python reference and MCU firmware.",
    commonDistinction:
      "Runtime parity checks versus offline accuracy alone on the training stack.",
    limitation:
      "Requires representative inputs and documented tolerance; does not replace ongoing production monitoring.",
    learnBefore: ["quantization", "tflm"],
    learnAfter: ["tinyml", "monitoring"],
  },
};
