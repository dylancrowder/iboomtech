
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Check,
  ChevronDown,
  Smartphone,
  Tablet,
  Laptop,
  Package,
} from "lucide-react";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Link from "next/link";
import useFilterStore from "@/zustand/filtro-productos";
import { useProductStores } from "@/zustand/filtro-data";
import { useEffect } from "react";

const categories = [
  { id: "iphone", name: "iPhone", icon: Smartphone },
  { id: "ipad", name: "iPad", icon: Tablet },
  { id: "macbook", name: "MacBook", icon: Laptop },
  { id: "android", name: "Android", icon: Smartphone },
  { id: "accessories", name: "Accesorios", icon: Package },
];

// Filter content component shared between desktop and mobile
function FilterContent({
  selectedCondition,
  setSelectedCondition,
  selectedCategory,
  setSelectedCategory,
  selectedModels,
  setSelectedModels,
  selectedColors,
  setSelectedColors,
  selectedMemory,
  setSelectedMemory,
}: {
  selectedCondition: any;
  setSelectedCondition: any;
  selectedCategory: string | null;
  setSelectedCategory: (category: string) => void;
  selectedModels: string[];
  setSelectedModels: (models: any) => void;
  selectedColors: any;
  setSelectedColors: (colors: any) => void;
  selectedMemory: any;
  setSelectedMemory: (memory: any) => void;

  onApplyFilters?: () => void;
}) {
  const setModel = useFilterStore((state: any) => state.setModel);
  const setColor = useFilterStore((state: any) => state.setColor);
  const setMemory = useFilterStore((state: any) => state.setMemory);
  const setCondition = useFilterStore((state: any) => state.setCondition);
  const { sortOrder, setSortOrder } = useFilterStore();
  const setCategory = useFilterStore((state: any) => state.setCategory);
  const { models, colors, memories } = useProductStores();
  const colores = [
    { name: "Coral", value: "#FF7F50" }, // Coral
    { name: "Negro", value: "#000000" }, // Negro
    { name: "Blanco", value: "#FFFFFF" }, // Blanco
    { name: "Gris espacial", value: "#2C2C2E" }, // Gris espacial
    { name: "Plata", value: "#C0C0C0" }, // Plata
    { name: "Oro", value: "#FFD700" }, // Oro
    { name: "Medianoche", value: "#1C1C1E" }, // Medianoche
    { name: "Luz estelar", value: "#F8F1E9" }, // Luz estelar
    { name: "Azul", value: "#0061F2" }, // Azul
    { name: "Rosa", value: "#FF2D55" }, // Rosa
    { name: "Verde", value: "#32D74B" }, // Verde
    { name: "Rojo", value: "#FF3B30" }, // Rojo
    { name: "Amarillo", value: "#FFFF00" }, // Amarillo
    { name: "Morado", value: "#800080" }, // Morado
    { name: "Verde Noche", value: "#004B23" }, // Verde Noche
    { name: "Azul Pacífico", value: "#1D2D87" }, // Azul Pacífico
    { name: "Titanio", value: "#E3DAC9" }, // Titanio
    { name: "Titanio Desierto", value: "#D8C0A2" }, // Titanio Desierto
    { name: "Grafito", value: "#474747" }, // Grafito
  ];

  const coloresFiltrados = colores.filter((color) =>
    colors.includes(color.name)
  );

  console.log("Colores filtrados:", coloresFiltrados);

  const handleCategoryChange = (category: string) => {
    if (selectedCategory === category) {
      setSelectedCategory("");
    } else {
      setSelectedCategory(category);
      setCategory(category);
      setSelectedModels([]);
    }
  };

  // Handle model selection

  const handleModelChange = (model: any) => {
    if (model === selectedModels) {
      setSelectedModels("");
      setModel("");
    }
    setSelectedModels([model]);
    setModel(model);
  };

  const sort = (sort: any) => {
    setSortOrder(sort);
  };
  // Handle color selection
  const handleColorChange = (color: any) => {
    if (color === selectedColors) {
      selectedColors("");
      setColor("");
    } else {
      setSelectedColors([color]);
      setColor(color);
    }
  };

  // Handle memory selection
  const handleMemoryChange = (memory: any) => {
    // Si la memoria seleccionada es la misma que la actual, lo desmarcamos
    if (memory === selectedMemory) {
      setSelectedMemory(""); // Desmarcar
      setMemory(""); // Limpiar el valor de memory en Zustand
    } else {
      setSelectedMemory([memory]); // Marcar el nuevo valor
      setMemory(memory); // Actualizar el valor de memory en Zustand
    }
  };

  function setSelectedConditions(condicion: any) {
    if (selectedCondition === condicion) {
      setSelectedCondition("");
    } else {
      setSelectedCondition(condicion);
      setCondition(condicion);
    }
  }

  return (
    <div className="flex flex-col gap-4 overflow-y-auto border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
      {/* Categories */}
      <div>
        <h3 className="font-medium mb-2">Categorías</h3>
        <RadioGroup
          value={selectedCategory || ""}
          onValueChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <div key={category.id} className="flex items-center">
              <Link href={`/productos/${category.id}`} passHref>
                <div role="link" className="flex">
                  <RadioGroupItem
                    value={category.id}
                    id={`category-${category.id}`}
                    onChange={() => handleCategoryChange(category.id)}
                    className="cursor-pointer"
                  />
                  <Label
                    htmlFor={`category-${category.id}`}
                    className="flex items-center"
                  >
                    <category.icon className="h-4 gap-2" />
                    <span className="cursor-pointer">{category.name}</span>
                  </Label>
                </div>
              </Link>
            </div>
          ))}
        </RadioGroup>
      </div>

      <Separator />

      {/* Models - Only show if a category is selected */}
      {selectedCategory && (
        <div>
          <h3 className="font-medium mb-2 cursor-pointer">Modelos</h3>
          <div className="space-y-2">
            {/* Checkbox para la categoría "todos" */}
            <div className="flex items-center space-x-2 ">
              <Checkbox
                id={`todos`}
                checked={selectedModels.includes("")}
                onCheckedChange={() => handleModelChange("")}
                className="cursor-pointer"
              />
              <Label className="cursor-pointer" htmlFor={`todos`}>
                Todos
              </Label>
            </div>

            {/* Mapeo de los modelos para la categoría seleccionada */}
            {models.map((model) => (
              <div key={model} className="flex items-center space-x-2">
                <Checkbox
                  id={`model-${model}`}
                  checked={selectedModels.includes(model)}
                  onCheckedChange={() => handleModelChange(model)}
                  className="cursor-pointer"
                />
                <Label className="cursor-pointer" htmlFor={`model-${model}`}>
                  {model}
                </Label>
              </div>
            ))}
          </div>
          <Separator className="my-4" />
        </div>
      )}

      {/* Condición */}
      <div>
        <h3 className="font-medium mb-2">Condición</h3>
        <RadioGroup
          value={selectedCondition}
          onValueChange={setSelectedConditions} // Asegúrate de que sea 'setSelectedCondition' y no plural
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value=""
              id="condition-todos"
              className="cursor-pointer"
            />
            <Label htmlFor="condition-nuevo" className="cursor-pointer ">
              Todos
            </Label>
          </div>

          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="nuevo"
              id="condition-nuevo"
              className="cursor-pointer"
            />
            <Label htmlFor="condition-nuevo" className="cursor-pointer">
              Nuevo
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem
              value="usado"
              id="condition-usado"
              className="cursor-pointer"
            />
            <Label htmlFor="condition-usado" className="cursor-pointer">
              Usado
            </Label>
          </div>
        </RadioGroup>
      </div>

      <Separator />

      {/* Colors */}
      {selectedCategory && selectedCategory !== "accessories" && (
        <Accordion type="single" collapsible className="w-full cursor-pointer">
          <AccordionItem value="colors">
            <AccordionTrigger className="py-2 cursor-pointer">
              Colores
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                {/* Checkbox para la categoría "todos los colores" */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="todos-colores"
                    checked={selectedColors.includes("")}
                    onCheckedChange={() => handleColorChange("")}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer" htmlFor="todos-colores">
                    Todos los colores
                  </Label>
                </div>

                {/* Mapeo de los colores filtrados */}
                {coloresFiltrados.map((color) => (
                  <div key={color.name} className="flex items-center space-x-2">
                    <Checkbox
                      id={`color-${color.name}`}
                      checked={selectedColors.includes(color.name)}
                      onCheckedChange={() => handleColorChange(color.name)}
                      className="cursor-pointer"
                    />
                    <Label
                      htmlFor={`color-${color.name}`}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{
                          backgroundColor: color.value, // Ahora accedemos correctamente al color
                          border:
                            color.name.toLowerCase() === "plata"
                              ? "1px solid #ccc"
                              : "none",
                        }}
                      />
                      {color.name}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}

      <Separator />

      {/* Memory */}
      {selectedCategory === "iphone" || selectedCategory === "ipad" ? (
        <Accordion type="single" collapsible className="w-full ">
          <AccordionItem value="memory">
            <AccordionTrigger className="py-2 cursor-pointer">
              Memoria
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="todos-memorias"
                    checked={selectedMemory.includes("")}
                    onCheckedChange={() => handleMemoryChange("")}
                    className="cursor-pointer"
                  />
                  <Label className="cursor-pointer" htmlFor="todos-memorias">
                    Todas las memorias
                  </Label>
                </div>
                {memories.map((memory) => (
                  <div key={memory} className="flex items-center space-x-2">
                    <Checkbox
                      id={`memory-${memory}`}
                      checked={selectedMemory.includes(memory)}
                      onCheckedChange={() => handleMemoryChange(memory)}
                      className="cursor-pointer"
                    />
                    <Label
                      className="cursor-pointer"
                      htmlFor={`memory-${memory}`}
                    >
                      {memory}
                    </Label>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      ) : null}

      <Separator />

      {/* Price Sorting */}
      <div>
        <h3 className="font-medium mb-2 ">Ordenar por precio</h3>
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            <Button variant="outline" className="w-full justify-between">
              {sortOrder === "asc"
                ? "Precio: Menor a Mayor"
                : "Precio: Mayor a Menor"}
              <ChevronDown className="ml-2 h-4 w-4 " />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <DropdownMenuItem onClick={() => sort("des")}>
              <ArrowUpAZ className="mr-2 h-4 w-4 " />
              <span className="cursor-pointer">Precio: Menor a Mayor</span>
              {sortOrder === "asc" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => sort("asc")}>
              <ArrowDownAZ className="mr-2 h-4 w-4" />
              <span className="cursor-pointer">Precio: Mayor a Menor</span>
              {sortOrder === "des" && <Check className="ml-auto h-4 w-4" />}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}

export default function ProductFilterSidebar() {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(
    null
  );
  const [selectedModels, setSelectedModels] = React.useState<string[]>([]);
  const [selectedColors, setSelectedColors] = React.useState<string[]>([]);
  const [selectedMemory, setSelectedMemory] = React.useState<string[]>([]);
  const [selectedCondition, setSelectedCondition] = React.useState<string[]>(
    []
  );
  const [isOpen, setIsOpen] = React.useState(false);
  const { category } = useFilterStore(); // Obtener la categoría del store

  useEffect(() => {
    setSelectedCategory(category);
  }, [category]);
  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden fixed bottom-4 right-4 z-50 ">
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button className="rounded-full shadow-lg">
              <Smartphone className="mr-2 h-4 w-4" />
              Filtros
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[85%] sm:w-[350px] overflow-y-auto"
          >
            <FilterContent
              selectedCondition={selectedCondition}
              setSelectedCondition={setSelectedCondition}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedModels={selectedModels}
              setSelectedModels={setSelectedModels}
              selectedColors={selectedColors}
              setSelectedColors={setSelectedColors}
              selectedMemory={selectedMemory}
              setSelectedMemory={setSelectedMemory}
              onApplyFilters={() => setIsOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <div className="hidden lg:block h-full overflow-y-auto pr-6 ">
        <FilterContent
          selectedCondition={selectedCondition}
          setSelectedCondition={setSelectedCondition}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          selectedModels={selectedModels}
          setSelectedModels={setSelectedModels}
          selectedColors={selectedColors}
          setSelectedColors={setSelectedColors}
          selectedMemory={selectedMemory}
          setSelectedMemory={setSelectedMemory}
        />
      </div>
    </>
  );
}
