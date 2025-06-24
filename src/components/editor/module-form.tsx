export function ModuleForm({
	schema,
	data,
	onChange,
}: {
	schema: Record<string, string>;
	data: Record<string, string | string[]>;
	onChange: (newData: Record<string, string | string[]>) => void;
}) {
	return (
		<form className="space-y-4">
			{Object.entries(schema).map(([key]) => {
				const value = data[key];

				return (
					<div key={key}>
						<label className="block font-medium capitalize mb-1">{key}</label>

						{Array.isArray(value) ? (
							<div className="space-y-2">
								{value.map((item, index) => (
									<div key={index} className="flex items-center gap-2">
										<input
											type="text"
											value={item}
											onChange={e => {
												const newArray = [...value];
												newArray[index] = e.target.value;
												onChange({ ...data, [key]: newArray });
											}}
											className="w-full px-3 py-2 border rounded"
										/>
										<button
											type="button"
											onClick={() => {
												const newArray = value.filter((_, i) => i !== index);
												onChange({ ...data, [key]: newArray });
											}}
											className="text-red-500 text-sm px-2 py-1 rounded hover:bg-red-100"
										>
											Delete
										</button>
									</div>
								))}

								<button
									type="button"
									onClick={() => {
										onChange({ ...data, [key]: [...value, ""] });
									}}
									className="text-sm text-blue-600 hover:underline"
								>
									+ Add item
								</button>
							</div>
						) : (
							<input
								type="text"
								value={value ?? ""}
								onChange={e => onChange({ ...data, [key]: e.target.value })}
								className="w-full px-3 py-2 border rounded"
							/>
						)}
					</div>
				);
			})}
		</form>
	);
}
